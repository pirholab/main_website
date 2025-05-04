#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Docker Site Proxy Setup Tool ===${NC}"
echo -e "This script will help you set up a proxy configuration for your Docker container.\n"

# Get domain name
read -p "Enter the domain name (e.g., example.com): " domain_name
while [[ -z "$domain_name" ]]; do
    echo -e "${RED}Domain name cannot be empty${NC}"
    read -p "Enter the domain name (e.g., example.com): " domain_name
done

# Get container name
echo -e "\n${BLUE}Listing running containers:${NC}"
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}"
echo ""

read -p "Enter the container name from the list above: " container_name
while [[ -z "$container_name" ]]; do
    echo -e "${RED}Container name cannot be empty${NC}"
    read -p "Enter the container name: " container_name
done

# Verify container exists
if ! docker ps --format "{{.Names}}" | grep -q "^${container_name}$"; then
    echo -e "${RED}Container '$container_name' not found or not running.${NC}"
    read -p "Do you want to continue anyway? (y/n): " continue_anyway
    if [[ "$continue_anyway" != "y" && "$continue_anyway" != "Y" ]]; then
        echo "Exiting script."
        exit 1
    fi
fi

# Get container port
read -p "Enter the container port (e.g., 3000, 5000, 8080): " container_port
while [[ ! "$container_port" =~ ^[0-9]+$ ]]; do
    echo -e "${RED}Invalid port. Please enter a number.${NC}"
    read -p "Enter the container port: " container_port
done

# Get container network information
echo -e "\n${BLUE}Getting container network information...${NC}"
container_networks=$(docker inspect "$container_name" -f '{{range $key, $val := .NetworkSettings.Networks}}{{$key}}{{end}}')
container_ip=$(docker inspect "$container_name" -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}')

if [[ -z "$container_networks" ]]; then
    echo -e "${RED}No networks found for container '$container_name'.${NC}"
    exit 1
fi

# Check if multiple networks
IFS=' ' read -r -a network_array <<< "$container_networks"
selected_network=""

if [[ ${#network_array[@]} -gt 1 ]]; then
    echo -e "\n${BLUE}Container is connected to multiple networks:${NC}"
    for i in "${!network_array[@]}"; do
        echo "$((i+1)). ${network_array[$i]}"
    done
    
    read -p "Select network number: " network_number
    while [[ ! "$network_number" =~ ^[0-9]+$ ]] || [[ "$network_number" -lt 1 ]] || [[ "$network_number" -gt ${#network_array[@]} ]]; do
        echo -e "${RED}Invalid selection. Please select a number between 1 and ${#network_array[@]}.${NC}"
        read -p "Select network number: " network_number
    done
    
    selected_network=${network_array[$((network_number-1))]}
else
    selected_network=$container_networks
fi

# Check if NPM is on the same network
npm_container="nginx-proxy-manager-app-1"
npm_networks=$(docker inspect "$npm_container" -f '{{range $key, $val := .NetworkSettings.Networks}}{{$key}} {{end}}' 2>/dev/null)

if [[ -z "$npm_networks" ]]; then
    echo -e "${RED}Error: Nginx Proxy Manager container not found.${NC}"
    echo -e "${RED}Make sure it's running with the name 'nginx-proxy-manager-app-1'${NC}"
    read -p "Do you want to continue anyway? (y/n): " continue_anyway
    if [[ "$continue_anyway" != "y" && "$continue_anyway" != "Y" ]]; then
        echo "Exiting script."
        exit 1
    fi
else
    if [[ "$npm_networks" != *"$selected_network"* ]]; then
        echo -e "${BLUE}Nginx Proxy Manager is not on the same network as your container.${NC}"
        read -p "Do you want to connect NPM to the '$selected_network' network? (y/n): " connect_npm
        
        if [[ "$connect_npm" == "y" || "$connect_npm" == "Y" ]]; then
            echo -e "${BLUE}Connecting NPM to network '$selected_network'...${NC}"
            if docker network connect "$selected_network" "$npm_container"; then
                echo -e "${GREEN}Successfully connected NPM to network '$selected_network'${NC}"
            else
                echo -e "${RED}Failed to connect NPM to network.${NC}"
                echo -e "${RED}You may need to run this command manually with sudo:${NC}"
                echo -e "docker network connect $selected_network $npm_container"
            fi
        else
            echo -e "${RED}Warning: NPM and your container are on different networks.${NC}"
            echo -e "${RED}Your proxy configuration may not work correctly.${NC}"
        fi
    else
        echo -e "${GREEN}Nginx Proxy Manager is already on the same network as your container.${NC}"
    fi
fi

# Generate configuration summary
echo -e "\n${BLUE}=== Proxy Configuration Summary ===${NC}"
echo -e "${GREEN}Domain:${NC} $domain_name"
echo -e "${GREEN}Container:${NC} $container_name"
echo -e "${GREEN}Container IP:${NC} $container_ip"
echo -e "${GREEN}Container Port:${NC} $container_port"
echo -e "${GREEN}Network:${NC} $selected_network"

echo -e "\n${BLUE}=== Nginx Proxy Manager Configuration ===${NC}"
echo -e "1. Access Nginx Proxy Manager admin at http://YOUR_SERVER_IP:81"
echo -e "2. Go to 'Proxy Hosts' and click 'Add Proxy Host'"
echo -e "3. Use these settings:"
echo -e "   - Domain Name: ${GREEN}$domain_name${NC}"
echo -e "   - Scheme: ${GREEN}http${NC}"
echo -e "   - Forward Hostname/IP: ${GREEN}$container_name${NC}"
echo -e "   - Forward Port: ${GREEN}$container_port${NC}"

echo -e "\n${BLUE}=== Alternative Forward Configuration ===${NC}"
echo -e "If using container name doesn't work, try using the IP address:"
echo -e "   - Forward Hostname/IP: ${GREEN}$container_ip${NC}"
echo -e "   - Forward Port: ${GREEN}$container_port${NC}"

echo -e "\n${GREEN}Configuration complete! Test your site at http://$domain_name${NC}" 

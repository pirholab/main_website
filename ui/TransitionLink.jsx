// ui/TransitionLink.js
import { useRouter } from "next/router";
import Link from "next/link";
import gsap from "gsap";

const TransitionLink = ({
  children,
  href,
  className,
  linkStyle = "",
  trRef,
  loading,
  setLoading,
}) => {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  const pathName = router?.pathname.split("/")[1] || null;
  const hrefName = href?.split("/")[1];

  const tl = gsap.timeline();

  const handleClick = (e) => {
    e.preventDefault();
    console.log("pathName:",pathName,"hrefName:",hrefName,"href:",href)
if (href === '/' && pathName === null) {
    
    
}else{
    
    if (pathName != hrefName) {
        
        setLoading(true);
        console.log(trRef?.current);
        tl.fromTo(
          trRef?.current,
          {
            y: "100%",
            duration: 0.1,
          },
          {
            y: "0%",
            duration: 0.1,
          }
        );
        setTimeout(() => {
          router.push(href);
        }, 1000);
      }
}
   
    

  };

  return (
    <div className={`relative ${linkStyle}`}>
      <Link
        href={href}
        prefetch={true}
        onClick={handleClick}
        className={className}
      >
        {children}
      </Link>
    </div>
  );
};

export default TransitionLink;

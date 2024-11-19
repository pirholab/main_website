import React from 'react'
import { motion } from 'framer-motion'

export function SingleSplitText({ children, className = '', textBody = '' }) {
    let words = children.split(' ')

    return (
        <div className={`flex flex-wrap ${textBody}`}>
            {
                words.map((word, i) => {
                    return (
                        <div
                            key={children + i}
                        >
                            <motion.div
                                initial={{ y: '100%', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                variants={{
                                    visible: i => ({
                                        y: 0,
                                        opacity: 1,
                                        transition: {
                                            delay: i * 0.1,
                                            type: 'spring',
                                            stiffness: 100,
                                        },
                                    }),
                                }}
                                whileInView="visible"  // Triggers animation when in view
                                viewport={{ once: false, amount: 0.1 }}  // Triggers when 10% of the element is in view
                                className={className}
                                custom={i}
                            >
                                {word + (i !== words.length - 1 ? '\u00A0' : '')}
                            </motion.div>
                        </div>
                    )
                })
            }
        </div>
    )
}

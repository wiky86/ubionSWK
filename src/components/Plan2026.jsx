import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Plan2026 = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}assets/data/plans_2026.json`)
            .then(res => res.json())
            .then(data => setPlans(data))
            .catch(err => console.error("Failed to load plans", err));
    }, []);

    return (
        <section className="py-20 px-4 bg-slate-800">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center">2026 Goals</h2>
                <div className="space-y-6">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center p-6 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold mr-6">
                                {index + 1}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                                <p className="text-slate-300">{plan.reason}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Plan2026;

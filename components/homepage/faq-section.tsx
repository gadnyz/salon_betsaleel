"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <motion.div className="border-b last:border-b-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
      <button onClick={onClick} className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-primary">
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="pb-4 text-muted-foreground">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
 
    {
      question: "Qui organise l'événement?",
      answer: "L'événement est organisé par les jeunes de l'église PPUNILU.",
    },
    {
      question: "Qui peut participer?",
      answer: "Les jeunes de l'église et tout jeune chrétien porteur d'un projet, à condition d'être rattaché à une église.",
    },
    {
      question: "Quels types de projets peuvent participer?",
      answer: "Tous les types de projets déjà commencés peuvent participer. Il ne s'agit pas d'une simple idée, mais d'un projet déjà engagé.",
    },
    {
      question: "Les lauréats reçoivent-ils un prix?",
      answer: "Oui, des prix seront attribués aux gagnants du concours.",
    },
    {
      question: "Peut-on devenir partenaire?",
      answer: "Oui. Les partenaires peuvent apporter un appui, un accompagnement et un soutien concret à l'initiative.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
          index={index}
        />
      ))}
    </div>
  );
}

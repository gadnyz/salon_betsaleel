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
      question: "Qu'est-ce que Talents & Talents?",
      answer: "Talents & Talents est le concept du salon entrepreneurial Betsaleel: une activite qui met en valeur les talents et initiatives entrepreneuriales des chretiens.",
    },
    {
      question: "Qui organise l'evenement?",
      answer: "L'evenement est organise par les jeunes de l'eglise PPUNILU.",
    },
    {
      question: "Qui peut participer?",
      answer: "Les jeunes de l'eglise et tout jeune chretien porteur d'un projet, a condition d'etre rattache a une eglise.",
    },
    {
      question: "Quels types de projets peuvent participer?",
      answer: "Tous les types de projets deja commences peuvent participer. Il ne s'agit pas d'une simple idee, mais d'un projet deja engage.",
    },
    {
      question: "Les laureats recoivent-ils un prix?",
      answer: "Oui, des prix seront attribues aux gagnants du concours.",
    },
    {
      question: "Peut-on devenir partenaire?",
      answer: "Oui. Les partenaires peuvent apporter un appui, un accompagnement et un soutien concret a l'initiative.",
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

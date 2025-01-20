import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, FileText, Download } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

interface Report {
  mood: string;
  concerns: string[];
  suggestions: string[];
  resources: string[];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your friendly AI therapist. How are you feeling today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const therapistResponses = {
    anxiety: [
      "I understand feeling anxious can be overwhelming. Could you tell me more about what's triggering these feelings?",
      "Anxiety is common among students. What specific situations make you feel most anxious?",
      "Let's explore some coping strategies for your anxiety. Would you like to try some breathing exercises?"
    ],
    stress: [
      "Academic pressure can be intense. What aspects of your studies are causing the most stress?",
      "How has this stress been affecting your daily routine?",
      "Let's break down your stressors and find manageable solutions together."
    ],
    depression: [
      "I hear you, and it's brave of you to share these feelings. How long have you been feeling this way?",
      "Have you noticed any changes in your sleep or appetite recently?",
      "Would you like to explore some activities that might help lift your mood?"
    ],
    default: [
      "Thank you for sharing. Could you tell me more about that?",
      "How long have you been experiencing these feelings?",
      "What kind of support are you looking for today?"
    ]
  };

  const generateReport = () => {
    // Analyze conversation to identify themes and concerns
    const conversation = messages.map(m => m.text.toLowerCase());
    const report: Report = {
      mood: determineMood(conversation),
      concerns: identifyConcerns(conversation),
      suggestions: generateSuggestions(conversation),
      resources: recommendResources(conversation)
    };
    setReport(report);
    setShowReport(true);
  };

  const determineMood = (conversation: string[]) => {
    if (conversation.some(msg => msg.includes('anxious') || msg.includes('worry'))) return 'anxious';
    if (conversation.some(msg => msg.includes('stress') || msg.includes('overwhelm'))) return 'stressed';
    if (conversation.some(msg => msg.includes('sad') || msg.includes('depress'))) return 'low';
    return 'neutral';
  };

  const identifyConcerns = (conversation: string[]) => {
    const concerns = [];
    if (conversation.some(msg => msg.includes('study') || msg.includes('exam'))) {
      concerns.push('Academic pressure');
    }
    if (conversation.some(msg => msg.includes('sleep') || msg.includes('tired'))) {
      concerns.push('Sleep issues');
    }
    if (conversation.some(msg => msg.includes('friend') || msg.includes('social'))) {
      concerns.push('Social relationships');
    }
    if (conversation.some(msg => msg.includes('future') || msg.includes('career'))) {
      concerns.push('Future concerns');
    }
    return concerns.length > 0 ? concerns : ['General wellness'];
  };

  const generateSuggestions = (conversation: string[]) => {
    const suggestions = [
      'Practice daily mindfulness meditation (10-15 minutes)',
      'Maintain a regular sleep schedule',
      'Exercise for at least 30 minutes daily',
      'Keep a mood journal'
    ];

    if (conversation.some(msg => msg.includes('anxious') || msg.includes('stress'))) {
      suggestions.push('Try deep breathing exercises when feeling overwhelmed');
      suggestions.push('Break large tasks into smaller, manageable steps');
    }

    if (conversation.some(msg => msg.includes('sad') || msg.includes('depress'))) {
      suggestions.push('Schedule enjoyable activities daily');
      suggestions.push('Reach out to friends or family regularly');
    }

    return suggestions;
  };

  const recommendResources = (conversation: string[]) => {
    const resources = [
      'Campus Counseling Services: Available 24/7',
      'Student Wellness Center',
      'Mindfulness and Meditation Apps'
    ];

    if (conversation.some(msg => msg.includes('crisis') || msg.includes('emergency'))) {
      resources.unshift('Crisis Helpline: 1-800-273-8255');
    }

    return resources;
  };

  const generateResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    let responseArray = therapistResponses.default;

    if (lowercaseInput.includes('anxiety') || lowercaseInput.includes('anxious')) {
      responseArray = therapistResponses.anxiety;
    } else if (lowercaseInput.includes('stress') || lowercaseInput.includes('stressed')) {
      responseArray = therapistResponses.stress;
    } else if (lowercaseInput.includes('depress') || lowercaseInput.includes('sad')) {
      responseArray = therapistResponses.depression;
    }

    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);

    // Generate and add bot response
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, { text: response, isBot: true }]);

      // After a few messages, offer to generate a report
      if (messages.length >= 6) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: "I've gathered some insights from our conversation. Would you like me to generate a wellness report with personalized suggestions? Type 'yes' to proceed.",
            isBot: true
          }]);
        }, 1000);
      }
    }, 1000);

    setInput('');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.toLowerCase() === 'yes' && messages.length >= 6) {
      generateReport();
    }
  };

  if (showReport) {
    return (
      <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Your Wellness Report</h3>
          <button
            onClick={() => {
              setShowReport(false);
              setIsOpen(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Current Mood</h4>
            <p className="text-gray-600">{report?.mood.charAt(0).toUpperCase() + report?.mood.slice(1)}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Identified Concerns</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {report?.concerns.map((concern, index) => (
                <li key={index}>{concern}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Suggested Actions</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {report?.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Helpful Resources</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {report?.resources.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              setShowReport(false);
              setIsOpen(false);
            }}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">AI Therapist</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-purple-50 text-gray-800'
                      : 'bg-purple-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInput}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
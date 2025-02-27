import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false); // Controls chatbox open/close state
    const [messages, setMessages] = useState([]);  // Stores chat messages
    const [input, setInput] = useState("");   // Stores user input

    // Function to toggle chat visibility
    const toggleChat = () => {
      setIsOpen(!isOpen);
  
      // If opening for the first time, set a default welcome message
      if (!isOpen && messages.length === 0) {
          setMessages([{ sender: "bot", text: "Welcome to Opportune.AI! How can I assist you today?" }]);
      }
  };
  

    // Function to send a message
    const handleSend = async () => {
        if (!input.trim()) return; // Prevent empty messages

        // Add user message to the chat
        setMessages(prev => [...prev, { sender: "user", text: input }]);

        try {
            // Send user input to the backend API
            const { data } = await axios.post("http://localhost:4000/chat/job-recommend", { query: input });

            // Format AI response (remove unwanted newlines)
            const formattedResponse = data.response.replace(/\*\*/g, "").replace(/\n/g, " ").split(". ").filter(line => line.trim() !== "");

            // Add AI response to the chat
            setMessages(prev => [...prev, { sender: "bot", text: formattedResponse.join(". ") }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I can Only recommend Jobs based on skills, location & experience", error }]);
        }

        setInput(""); // Clear input field
    };

    return (
        <div>
            {/* Chat Icon to Open the Chatbot */}
            {!isOpen && (
                <div
                    className="fixed bottom-8 sm:right-8 right-5 bg-red-500 p-3 rounded-full cursor-pointer shadow-lg hover:bg-red-600 transition-all duration-300"
                    onClick={toggleChat}
                >
                    <MessageCircle size={28} color="white" />
                </div>
            )}

            {/* Chat Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ width: "100%", maxWidth: "500px" }}
            >
                <div className="flex flex-col text-gray-600 h-full p-4 sm:p-6">
                    {/* Close Button */}
                    <button
                        onClick={toggleChat}
                        className="self-start text-3xl text-black cursor-pointer"
                    >
                        <X size={25} />
                    </button>

                    {/* Chat Header */}
                    <h2 className="text-xl font-semibold text-gray-700 text-center mb-2">Opportune.AI</h2>

                    {/* Chat Messages */}
                    <div className="flex-1 bg-gray-100 p-3 rounded-lg overflow-y-auto h-80 sm:h-full flex flex-col space-y-2">
                      {messages.map((msg, index) => (
                          <div key={index} className={`max-w-[75%] p-3 rounded-lg text-sm ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}>
                              {msg.text}
                          </div>
                      ))}
                  </div>


                    {/* Chat Input */}
                    <div className="flex items-center border-t pt-2">
                        <input
                            type="text"
                            className="flex-1 border p-2 rounded focus:outline-none"
                            placeholder="Ask about jobs..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button 
                            className="bg-red-500 text-white px-4 py-2 ml-2 rounded hover:bg-red-600 cursor-pointer"
                            onClick={handleSend}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;

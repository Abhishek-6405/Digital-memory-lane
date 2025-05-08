import React from "react";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="faq-container">
      <header className="faq-header">
        <h1>Frequently Asked Questions</h1>
      </header>

      <section className="faq-content">
        <div className="faq-item">
          <h2>How do I add a memory?</h2>
          <p>
            To add a memory, log in to your account, click on the "Add Memory" button, and fill in the details.
            You can upload an image and set a title, description, and date for your memory.
          </p>
        </div>

        <div className="faq-item">
          <h2>Can I delete a memory?</h2>
          <p>
            Yes, you can remove any memory at any time. Simply click the "Remove" button next to the memory you
            wish to delete.
          </p>
        </div>

        <div className="faq-item">
          <h2>Can I share my memories with others?</h2>
          <p>
            Absolutely! You can share individual memories with friends or family via unique links. You can also
            choose to make them public or restrict them to certain people.
          </p>
        </div>

        <div className="faq-item">
          <h2>What happens if I forget my password?</h2>
          <p>
            If you forget your password, simply click on the "Forgot Password" link on the login page to reset
            it. You'll receive an email with instructions to reset your password.
          </p>
        </div>
      </section>

      <footer className="faq-footer">
        <p>If you have any other questions, feel free to contact us!</p>
      </footer>
    </div>
  );
};

export default FAQ;

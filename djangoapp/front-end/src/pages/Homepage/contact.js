import React from 'react';
import './homepage.css';

function ContactUs() {
    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>  <br/>
            <form>
                <div className="form-group">
                    <input type="text" id="name" placeholder="Your name" />
                </div>
                <div className="form-group">
                    <input type="email" id="email" placeholder="Your email" />
                </div>
                <div className="form-group">
                    <textarea id="message" placeholder="Your message"></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default ContactUs;
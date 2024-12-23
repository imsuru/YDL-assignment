import React from "react";

const Form = () => {
  // Submit handler function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Collect form data from the input fields
    const formData = {
      name: e.target.name.value,
      number: e.target.number.value,
      email: e.target.email.value,
      notes: e.target.notes.value,
    };

    try {
      // Send form data to the backend
      const response = await fetch("http://localhost:5001/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        e.target.reset(); // Reset the form fields after successful submission
      } else {
        const errorData = await response.json();
        alert(`Failed to submit form: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <section className="form-section bg-red-700 text-white py-8 px-4">
      <h2 className="text-xl font-bold text-center mb-6">Form</h2>
      <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
        {/* Name and Number fields side by side */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="p-2 bg-white text-black rounded w-full"
          />
          <input
            type="number"
            name="number"
            placeholder="Number"
            required
            className="p-2 bg-white text-black rounded w-full"
          />
        </div>

        {/* Email field */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 bg-white text-black rounded"
        />

        {/* Notes field */}
        <textarea
          name="notes"
          placeholder="Notes"
          rows="4"
          className="w-full p-2 bg-white text-black rounded"
        ></textarea>

        {/* Save button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-white text-red-700 font-bold py-2 px-4 rounded w-full sm:w-1/2"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

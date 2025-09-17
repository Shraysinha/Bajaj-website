import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

export function useInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    inquiry_type: "enquiry",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitInquiry = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }
      return response.json();
    },
    onSuccess: () => {
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        inquiry_type: "enquiry",
      });
      setTimeout(() => setFormSubmitted(false), 5000);
    },
    onError: (error) => {
      console.error("Error submitting inquiry:", error);
    },
  });

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submitInquiry.mutate(formData);
    },
    [formData, submitInquiry],
  );

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return {
    formData,
    formSubmitted,
    handleInputChange,
    handleFormSubmit,
    isSubmitting: submitInquiry.isLoading,
  };
}

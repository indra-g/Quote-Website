import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../libs/api";
const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push(`/quotes`);
    }
  }, [history, status]);
  const AddQuote = (newQuote) => {
    sendRequest(newQuote);
  };
  return <QuoteForm isLoading={status === "pending"} onAddQuote={AddQuote} />;
};
export default NewQuote;

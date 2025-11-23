import { useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post<{ review: string }>(
        "http://localhost:5000/review",
        { code }
      );
      setReview(res.data.review);
    } catch (err: any) {
      setReview("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>AI Code Reviewer </h1>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here"
        rows={10}
        cols={80}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Reviewing..." : "Review Code"}
      </button>

      {review && (
        <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
          <h2>AI Review:</h2>
          {review}
        </div>
      )}
    </div>
  );
}

export default App;
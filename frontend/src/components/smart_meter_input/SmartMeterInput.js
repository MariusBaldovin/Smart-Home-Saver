import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase/Firebase";
import { useAuth } from "../../context/Authcontext";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import "./SmartMeterInput.css";
import Frame from "../../components/frame/Frame";

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

function SmartMeterInput() {
  const [successMessage, setSuccessMessage] = useState("");
  const [electricityCost, setElectricityCost] = useState("");
  const [gasCost, setGasCost] = useState("");
  const [dataEntries, setDataEntries] = useState([]);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const dateString = now.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const timeString = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const data = {
      userId: currentUser.uid,
      date: dateString,
      time: timeString,
      electricityCost: parseFloat(electricityCost),
      gasCost: parseFloat(gasCost),
    };

    try {
      await addDoc(collection(db, "energyData"), data);
      setSuccessMessage("Energy cost added successfully!");
      // Oclear the form fields
      setElectricityCost("");
      setGasCost("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setSuccessMessage(""); // Clear success message in case of any errors
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const q = query(
      collection(db, "energyData"),
      where("userId", "==", currentUser.uid),
      where("date", ">=", startOfMonth.toISOString()),
      orderBy("date")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const entries = [];
      querySnapshot.forEach((doc) => {
        entries.push(doc.data());
      });
      setDataEntries(entries);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="meter-input-container">
      <Frame>
        <h2>Enter Daily Energy Cost</h2>
        <form onSubmit={handleSubmit}>
          <div className="meter-input-cost">
            <div className="cost">
              <label>Electricity Cost</label>
              <input
                type="number"
                step="0.01"
                value={electricityCost}
                onChange={(e) => setElectricityCost(e.target.value)}
              />
              <label>£</label>
            </div>

            <div className="cost">
              <label>Gas Cost</label>
              <input
                type="number"
                step="0.01"
                value={gasCost}
                onChange={(e) => setGasCost(e.target.value)}
              />
              <label>£</label>
            </div>
          </div>
          <div className="submit_button">
            <button type="submit">Submit Energy Cost</button>
          </div>
        </form>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}{" "}
      </Frame>
      <Frame>
        <h2>Monthly Energy Costs</h2>
        <ul>
          {dataEntries.map((entry, index) => (
            <li key={index}>
              {entry.date} {entry.time} - Electricity: £{entry.electricityCost},
              Gas: £{entry.gasCost}
            </li>
          ))}
        </ul>
      </Frame>
    </div>
  );
}

export default SmartMeterInput;

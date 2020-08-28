package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

//Loan struct to capture all the needed information
type Loan struct {
	Amount                   float32
	Period                   float32
	Deposit                  float32
	InterestRate             float32
	MonthlyPayment           float32
	TotalAmountToPay         float32
	BalloonPaymentAmount     float32
	BalloonPaymentPercentage float32
}

var loan []Loan = []Loan{}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/calculateVehicleFinance", calculateVehicleFinance).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:4200"},
	})

	handler := c.Handler(router)

	srv := &http.Server{
		Handler: handler,
		Addr:    ":8000",
	}

	log.Fatal(srv.ListenAndServe())
}

func calculateVehicleFinance(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var newItem Loan

	json.NewDecoder(r.Body).Decode(&newItem)

	newItem.BalloonPaymentAmount = newItem.Amount * (newItem.BalloonPaymentPercentage / 100)
	newItem.Amount = newItem.Amount - newItem.Deposit
	newItem.Amount = newItem.Amount - newItem.BalloonPaymentAmount
	newItem.MonthlyPayment = (newItem.Amount) / ((((1 + (newItem.InterestRate / 100)) * newItem.Period) - 1) / ((newItem.InterestRate / 100) * (1 + (newItem.InterestRate / 100)) * newItem.Period))
	newItem.TotalAmountToPay = newItem.MonthlyPayment * newItem.Period

	loan = append(loan, newItem)

	json.NewEncoder(w).Encode(newItem)
}

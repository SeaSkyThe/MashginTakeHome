
// Checkout form

import React, { useState } from "react";
import { CartItem } from "../types/cart";
import { Button, Grid2, Divider, Modal, Typography, Box, TextField, InputAdornment, Alert } from "@mui/material";
import { AccountCircle, AlternateEmail, CalendarToday, Close, CreditCard, Payment, PermIdentity } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { placeOrder } from "../api/orderService";
import { CheckoutPayload } from "../types/checkout";

interface CheckoutFormProps {
    subtotal: number;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    isCheckoutOpen: boolean;
    setIsCheckoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const validations = {
    isNotEmpty: (value: string): boolean => value.trim() !== "",

    // S+ means one or more non-whitespace characters
    isValidEmail: (email: string): boolean => /\S+@\S+\.\S+/.test(email),

    isValidCardNumber: (cardNumber: string): boolean => {
        // Remove non-numeric characters
        const digitsOnly = cardNumber.replace(/[^0-9]/g, '');
        // Check if the string is 16 digits long and contains only digits
        return digitsOnly.length === 16 && !isNaN(Number(digitsOnly));
    },

    isValidCVC: (cvc: string): boolean => {
        // Only check if the string is 3 digits long and contains only digits
        return cvc.length === 3 && !isNaN(Number(cvc));
    },

    isValidExpirationDate: (expirationDate: string): boolean => {
        // Check if the string is in the format MM/YY
        if (!expirationDate.includes("/") || expirationDate.split("/").length !== 2) {
            return false;
        }

        const [month, year] = expirationDate.split("/");

        // Check if month and year are valid numbers
        if (isNaN(Number(month)) || isNaN(Number(year))) {
            return false;
        }

        const monthNumber = parseInt(month, 10);
        const yearNumber = parseInt(year, 10);

        if (monthNumber < 1 || monthNumber > 12) {
            return false;
        }

        // Check if expiration date is in the future
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
        const currentYear = currentDate.getFullYear() % 100; // Only last two digits, if im not wrong

        return yearNumber > currentYear || (yearNumber === currentYear && monthNumber >= currentMonth);
    }



}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ subtotal, setCartItems, cartItems, isCheckoutOpen, setIsCheckoutOpen }) => {
    const [formData, setFormData] = useState<CheckoutPayload>({
        items: cartItems,
        customer_name: "",
        customer_email: "",
        cardholder_name: "",
        cvc: "",
        expiration_date: "",
        card_number: "",
    });

    const [formErrors, setFormErrors] = useState<Partial<CheckoutPayload>>({});
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | null>(null);

    const formatCardNumber = (value: string) => {
        // Adding spaces between every 4 digits
        let cleaned = value.replace(/[^0-9]/g, '').split("").slice(0, 16);
        let formatted = "";

        for (let i = 0; i < cleaned.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formatted += " ";
            }
            formatted += cleaned[i];
        }

        return formatted;
    };

    const validateField = (name: keyof CheckoutPayload, value: string): string => {
        switch (name) {
            case 'customer_name':
                return validations.isNotEmpty(value) ? '' : 'Name is required';

            case 'customer_email':
                return !value ? 'Email is required' :
                    !validations.isValidEmail(value) ? 'Please enter a valid email address' : '';

            case 'card_number':
                return !value ? 'Card number is required' :
                    !validations.isValidCardNumber(value) ? 'Please enter a valid 16-digit card number' : '';

            case 'cardholder_name':
                return validations.isNotEmpty(value) ? '' : 'Cardholder name is required';

            case 'cvc':
                return !value ? 'CVC is required' :
                    !validations.isValidCVC(value) ? 'CVC must be 3 digits' : '';

            case 'expiration_date':
                return !value ? 'Expiration date is required' :
                    !validations.isValidExpirationDate(value) ? 'Please enter a valid expiration date (MM/YY)' : '';

            default:
                return '';
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let processedValue = value

        if (name === "card_number") {
            const digitsOnly = value.replace(/[^0-9]/g, '').slice(0, 16); // Remove non-numeric characters
            processedValue = digitsOnly;
        } else if (name === "cvc") {
            processedValue = value.replace(/[^0-9]/g, '').slice(0, 3);

        } else if (name === "expiration_date") {
            const digitsOnly = value.replace(/[^0-9]/g, '');

            if (digitsOnly.length <= 2) {
                processedValue = digitsOnly;
            } else {
                processedValue = `${digitsOnly.substring(0, 2)}/${digitsOnly.substring(2, 4)}`;
            }
        }

        setFormData({
            ...formData,
            [name]: processedValue,
        });

        const error = validateField(name as keyof CheckoutPayload, processedValue);
        setFormErrors({
            ...formErrors,
            [name]: error,
        });

    };

    const validateForm = (): boolean => {
        const errors: Partial<CheckoutPayload> = {};
        let isValid = true;

        Object.keys(formData).forEach((key) => {
            if (key === "items") return;

            const fieldName = key as keyof CheckoutPayload;
            const error = validateField(fieldName, formData[fieldName] as string);

            if (error) {
                errors[fieldName] = error as any; // TODO: Fix this
                isValid = false;
            }
        });

        setFormErrors(errors);

        return isValid;

    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const updatedFormData = { ...formData, items: cartItems };
            const res = await placeOrder(updatedFormData);
            if (res.status !== 201) {
                setAlertMessage("Error during payment.");
                setAlertSeverity("error");
            } else {
                setAlertMessage("Your payment was successful!");
                setAlertSeverity("success");
            }
        }
        catch (err) {
            console.error("Error during payment: ", err);
            setAlertMessage("Error during payment.");
            setAlertSeverity("error");
        }

        setTimeout(() => {
            setAlertMessage(null);
            setAlertSeverity(null);
            setIsCheckoutOpen(false);

            setFormData({
                items: [],
                customer_name: "",
                customer_email: "",
                cardholder_name: "",
                cvc: "",
                expiration_date: "",
                card_number: "",
            });

            setCartItems([]);
        }, 3000);

    };

    return (
        <>
            <Modal
                open={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                aria-labelledby="Checkout Modal"
                aria-describedby="Checkout Modal"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: 3,
                    boxShadow: 24,
                    padding: 4,
                }}>
                    {
                        alertMessage && alertSeverity &&
                        <Alert variant="filled" severity={alertSeverity} sx={{ marginTop: 2 }} >
                            {alertMessage}
                        </Alert>

                    }

                    <Grid2 sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                        <Grid2 size={8}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                                color="secondary">
                                Checkout payment
                            </Typography>

                        </Grid2>
                        <Grid2 size={4}>
                            <IconButton onClick={() => setIsCheckoutOpen(false)}>
                                <Close />
                            </IconButton>

                        </Grid2>
                    </Grid2>

                    <Divider />

                    <Box sx={{ padding: 2 }} component="form" autoComplete="off" onSubmit={handleSubmit} >
                        <TextField
                            id="customer-name"
                            label="Name"
                            name="customer_name"
                            placeholder="Marcelo Silva"
                            value={formData.customer_name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formErrors.customer_name}
                            helperText={formErrors.customer_name}
                            color="secondary"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <AccountCircle color="secondary" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            id="customer-email"
                            label="Email"
                            name="customer_email"
                            placeholder="your@email.com"
                            value={formData.customer_email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formErrors.customer_email}
                            helperText={formErrors.customer_email}
                            color="secondary"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <AlternateEmail color="secondary" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            id="card-number"
                            label="Card Number"
                            name="card_number"
                            placeholder="1234 1234 1234 1234"
                            value={formatCardNumber(formData.card_number)}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formErrors.card_number}
                            helperText={formErrors.card_number}
                            color="secondary"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <CreditCard color="secondary" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            id="cardholder-name"
                            label="Cardholder Name"
                            name="cardholder_name"
                            placeholder="Marcelo Rodrigues"
                            value={formData.cardholder_name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formErrors.cardholder_name}
                            helperText={formErrors.cardholder_name}
                            color="secondary"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <PermIdentity color="secondary" />
                                        </InputAdornment>
                                    ),
                                },
                            }}

                        />

                        <TextField
                            id="cvc"
                            label="CVC"
                            name="cvc"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formErrors.cvc}
                            helperText={formErrors.cvc}
                            color="secondary"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <Payment color="secondary" />
                                        </InputAdornment>
                                    ),
                                },
                            }}

                        />

                        <TextField
                            id="expiration-date"
                            label="Expiration Date (MM/YY)"
                            name="expiration_date"
                            placeholder="MM/YY"
                            value={formData.expiration_date}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formErrors.expiration_date}
                            helperText={formErrors.expiration_date}
                            color="secondary"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <CalendarToday color="secondary" />
                                        </InputAdornment>
                                    ),
                                },
                            }}

                        />

                        <Divider sx={{ my: 2 }} />

                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            type="submit"
                            sx={{ letterSpacing: ".1em" }}
                        >
                            PAY ${subtotal.toFixed(2)}
                        </Button>

                    </Box>
                </Box>

            </Modal>
        </>
    );


};

export default CheckoutForm;

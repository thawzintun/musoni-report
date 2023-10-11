import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { SHA256 } from "crypto-js";
import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";
const EnvCheckForm = () => {
    const message = useActionData();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <div className="bg-white border border-gray-200 p-10 space-y-6 rounded">
            <h3 className="text-xl font-semibold">
                Please Enter Environment Variable
            </h3>

            <Form method="post" className="grid grid-flow-row gap-y-3">
                <FormControl variant="outlined">
                    <InputLabel id="env" className="text-gray-500">
                        Environment Variable
                    </InputLabel>
                    <OutlinedInput
                        id="env"
                        name="env"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Environment Variable"
                    />
                </FormControl>
                {/* <input
                    type="password"
                    name="env"
                    id="env"
                    className="border rounded border-gray-400 mb-2 px-2 py-1"
                /> */}
                <Button
                    sx={{
                        bgcolor: "black",
                        color: "white",
                        ":hover": {
                            bgcolor: "gray",
                        },
                    }}
                    type="submit"
                    variant="contained"
                >
                    Continue
                </Button>
                {message && <small className="text-red-500">{message}</small>}
            </Form>
        </div>
    );
};

export default EnvCheckForm;

export const action = async ({ request, params }) => {
    const enc =
        "6f503ae9985d5328ab59bf6e8bb1ebf96f3bda79586cd42a56a90bc7bcfa9797";
    const data = await request.formData();
    const env = data.get("env");
    const encrypted = SHA256(env).toString();
    if (encrypted === enc) {
        localStorage.setItem("env", encrypted);
        const expDate = new Date();
        expDate.setHours(expDate.getHours() + 1);
        localStorage.setItem("exp", expDate.toISOString());
        return redirect("/");
    }
    return "The variable is not valid. Please Try Again!";
};

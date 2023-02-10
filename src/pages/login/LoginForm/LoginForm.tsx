import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import FormHeader from "./FormHeader/FormHeader";
import {
  getTextFieldDefaultState,
  validatePassword,
  validateEmail,
} from "src/helpers";
import React, { useCallback, useMemo, useState } from "react";
import { cloneDeep } from "lodash";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import axiosMockInstance from "src/axios/axios.mock-adapter";
import { useDispatch } from "react-redux";
import { actionSetAuth } from "src/redux/auth/auth.action";
import { useNavigate } from "react-router";

type FormField = {
  value: string;
  isValid: boolean;
  errorText: string | null;
  isTouched: boolean;
};
type LoginFormData = {
  email: FormField;
  password: FormField;
};

const defaultLoginState: LoginFormData = {
  email: getTextFieldDefaultState(),
  password: getTextFieldDefaultState(),
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>(
    cloneDeep(defaultLoginState)
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const validateField = useCallback(
    (value: string, key: keyof LoginFormData) => {
      switch (key) {
        case "email":
          return validateEmail(value);
        case "password":
          return validatePassword(value);
      }
    },
    []
  );

  const handleFormChange = useCallback(
    (value: string, key: keyof LoginFormData) => {
      const validationResult = validateField(value, key);

      setFormData((prevData): LoginFormData => {
        return {
          ...prevData,
          [key]: {
            isTouched: true,
            isValid: validationResult.isValid,
            errorText: validationResult.message,
            value,
          } as FormField,
        };
      });
    },
    [validateField]
  );

  const markFormAsTouched = useCallback(() => {
    setFormData((formData) => {
      return Object.keys(formData).reduce((prevVal, field): LoginFormData => {
        prevVal[field as keyof LoginFormData] = {
          ...formData[field as keyof LoginFormData],
          isTouched: true,
        };
        return prevVal;
      }, {} as LoginFormData);
    });
  }, []);

  const isFormInvalid = useMemo(() => {
    return Object.values(formData).some((field) => !field.isValid);
  }, [formData]);

  const validateForm = useCallback(() => {
    if (isFormInvalid) {
      return false;
    }

    const isAnyFieldUntouched = Object.values(formData).some(
      (field) => !field.isTouched
    );
    if (isAnyFieldUntouched) {
      markFormAsTouched();
      return false;
    }

    return true;
  }, [formData, isFormInvalid, markFormAsTouched]);

  const sendLoginRequest = useCallback(() => {
    setIsLoading(true);
    const body = {
      email: formData.email.value,
      password: formData.password.value,
    };
    axiosMockInstance
      .post("/login", body)
      .then((res) => {
        if (res.status === 200) {
          dispatch(actionSetAuth(res.data));
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        }
      })
      .catch((res) => {
        setHasFailed(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, formData.email.value, formData.password.value, navigate]);

  const handleSubmit = useCallback(() => {
    const result = validateForm();
    if (!result) return;

    sendLoginRequest();
  }, [sendLoginRequest, validateForm]);

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormHeader />
      <Snackbar
        open={hasFailed}
        autoHideDuration={4000}
        onClose={() => setHasFailed(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Invalid Credentials
        </Alert>
      </Snackbar>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          onChange={(evt) => {
            handleFormChange(evt.target.value, "email");
          }}
          error={formData.email.isTouched && !formData.email.isValid}
          helperText={formData.email.errorText}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={(evt) => {
            handleFormChange(evt.target.value, "password");
          }}
          error={formData.password.isTouched && !formData.password.isValid}
          helperText={formData.password.errorText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <RemoveRedEye /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isFormInvalid || isLoading}
          onClick={() => handleSubmit()}
        >
          {isLoading && <CircularProgress color="inherit" size={"1.5rem"} />}
          {!isLoading && "Log in "}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;

"use client";
import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import FormMessage from '@/app/components/Message/FormMessage';
import SubmitButton from '@/app/components/Form/SubmitButton';
import Input from '@/app/components/Form/Input';
import PageConfig from '../pageConfig';
import { ** interface_name ** } from '@/app/interface/** interface_name **';

interface Props { data?: Area }

const { service, route } = PageConfig;

const Form = ({ data }: Props) => {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [error, setError] = useState<boolean>(false);
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please type ** interface_name ** Name').label("** interface_name ** Name"),
    });

    const { values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = useFormik({
        initialValues: {
            name: data?.name || "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            let response;
            let valuesData = { "name": values.name }
            if (data) {
                response = await service.put(data._id, { data: valuesData });
            } else {
                response = await service.post(valuesData);
            }
            setSubmitting(false);
            if (response.success) {
                setError(false);
                setMessage(response.message);
                setTimeout(() => { router.push(route); }, 1000);
            } else {
                setError(true);
                setMessage(response.message);
            }
            setSubmitting(false);
        }
    });


    return (
        <form onSubmit={handleSubmit} className="card-body">
            <div className="space-y-2">
                <Input params={{
                    label: "** interface_name **",
                    name: "name",
                    require: true,
                    handleChange: handleChange,
                    handleBlur: handleBlur,
                    value: values.name,
                    errors: errors,
                    touched: touched,
                    placeholder: "Enter ** interface_name **"
                }} />
            </div>
            <FormMessage error={error} message={message} />
            <div className="mt-5">
                <SubmitButton params={{ isSubmitting, label: data ? "Update" : "Save" }} />
            </div>
        </form>

    )
}

export default Form
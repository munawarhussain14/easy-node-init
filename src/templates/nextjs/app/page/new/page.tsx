import React from 'react'
import Form from '../form/Form'
import PageConfig from '../pageConfig'
import { Country } from '@/app/interface/Country'

interface Props {
    params: {
        id: string
    }
}

const { create } = PageConfig;

const NewPage = async ({ params: { id } }: Props) => {

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{create.title}</h1>
            <div className="bg-white p-4 shadow-md">
                <Form />
            </div>
        </div>
    )
}

export default NewPage
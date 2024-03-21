import React from 'react'
import Form from '../../form/Form'
import { notFound } from 'next/navigation'
import PageConfig from '../../pageConfig'
import { ** interface_name ** } from '@/app/interface/** interface_name **'

interface Props {
    params: {
        id: string
    }
}

const { title, service, view, create, edit, route } = PageConfig;

const EditPage = async ({ params: { id } }: Props) => {
    const response = await service.getById(id);
    let data: ** interface_name **;
    if (response.success) {
        data = response.data
    } else {
        notFound();
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{edit.title}</h1>
            <div className="bg-white p-4 shadow-md">
                <Form data={data} />
            </div>
        </div>
    )
}

export default EditPage
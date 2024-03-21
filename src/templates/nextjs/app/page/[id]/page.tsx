import React from 'react'
import { notFound } from 'next/navigation'
import PageConfig from '../pageConfig'
import { ** interface_name ** } from '@/app/interface/** interface_name **'

interface Props {
    params: {
        id: string
    }
}

const { service, view } = PageConfig;

const DetailPage = async ({ params: { id } }: Props) => {

    const response = await service.getById(id);
    let data: ** interface_name **;
    if (response.success) {
        data = response.data;
    }
    else {
        notFound();
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{view.title}</h1>
            <div className="bg-white p-4 shadow-md">
                <div className="overflow-x-auto">
                    <div>
                        <div className="text-xl font-medium text-black">{data.name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage
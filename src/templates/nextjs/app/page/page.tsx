"use client";
import React from 'react'
import { HiPlusCircle, HiTrash } from 'react-icons/hi2';
import Link from 'next/link';
import Datatable from '@/app/components/Datatable/Datatable';
import action from '@/app/utils/action';
import PageConfig from './pageConfig';

const { title, service, view, create, edit } = PageConfig;

const Page = () => {

    const fetch = async (page: number, pageSize: number, searchValue: string) => {
        try {
            const params = { page, resPerPage: pageSize, keyword: searchValue };
            const response = await service.getAll({ params });
            return response;
        } catch (error) {
            return {
                "success": true,
                "page": 1,
                "resPerPage": 10,
                "count": 0,
                "totalPages": 0,
                "data": []
            };
        }
    };

    const columns: any = [
        {
            name: 'Name',
            cell: (row: any) => (row.name),
            // sortable: true,
        },
        {
            name: 'Action',
            width: "10%",
            selector: (row: any) => action({
                routes: [
                    { key: "view-" + row._id, href: view.getRoute(row._id), icon: view.icon },
                    { key: "edit-" + row._id, href: edit.getRoute(row._id), icon: edit.icon },
                    {
                        key: "delete-" + row._id,
                        delete: true,
                        onDelete: () => {
                            alert(row._id);
                        },
                        href: "#", icon: <HiTrash />
                    },
                ]
            }),
            // sortable: true,
        },
    ];

    const paginationOptions = {
        rowsPerPageText: 'Rows per page:',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All',
    };

    return (
        <div className="container mx-auto p-4">
            <div className='flex text-justify'>
                <div className='w-1/2'>
                    <h1 className="text-2xl font-bold mb-4">{title}</h1>
                </div>
                <div className='w-1/2 text-right'>
                    {true && <Link href={create.route} className='btn'>Add <HiPlusCircle className="h-6 w-6" /></Link>}
                </div>
            </div>
            <div className="bg-white p-4 shadow-md">
                <div className="overflow-x-auto">
                    <Datatable onFetchData={fetch} columns={columns} />
                </div>
            </div>
        </div>
    )
}

export default Page
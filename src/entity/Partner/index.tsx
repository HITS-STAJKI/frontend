import { Company, GroupUpdate }  from "shared/lib"
import { Space } from '@mantine/core';
import { useState } from 'react';

type PartnerProps = {
    partner: Company; 
}

export const Partner = ({ partner }: PartnerProps) => {

    return (
        <div style={{
            padding: '10px', 
            border: '1px solid black', 
            borderRadius: '8px', 
            marginBottom: '10px', 
            width: '100%', 
            boxSizing: 'border-box' 
        }}>
            
            {partner.name}

        </div>
    )
}
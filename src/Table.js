import React, { Component } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import './Table.css';

function Table({countries}) {
    return (
        <ScrollContainer className="scroll-container">
        <div className="table">
            {/* destructuring while accessing */}
            {countries.map(({country,cases})=>(
                <tr>
                    <td>
                        {country}
                    </td>
                    <td>
                        <b>{cases}</b>
                    </td>
                </tr>
            ))}
        </div>
        </ScrollContainer>
    );
}

export default Table

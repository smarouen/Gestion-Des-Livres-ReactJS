import React, { Component } from 'react';
import {ProductConsumer} from '../Context';
import { Table , Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class Home extends Component {
    render() {
        return (
            <div className='container'>
                <br></br>
                <h3>Gestion Des Livres | ReactJS</h3><br></br>
                <ProductConsumer>
                    {(value) => {
                        return(
                            <Table size='sm' variant='Gray' striped bordered hover>
                                <tbody>
                                    <tr>
                                        <th>Title</th>
                                        <th>Information</th>
                                        <th>Author</th>
                                        <th>Price</th>
                                        <th style={{ width: '150px', whiteSpace: 'nowrap' }}>Actions</th>
                                    </tr>
                                    <tr>
                                        <td> <input type="text" value={value.title} onChange={(e)=>{value.updateValue(e,"title")}} /> </td>
                                        <td> <input type="text" value={value.info} onChange={(e)=>{value.updateValue(e,"info")}} /> </td>
                                        <td> <input type="text" value={value.author} onChange={(e)=>{value.updateValue(e,"author")}} /> </td>
                                        <td> <input type="text" value={value.price} onChange={(e)=>{value.updateValue(e,"price")}} /> </td>
                                        <td> <Button size="sm" variant="success" onClick={()=>{value.onSave(value.id)}}>{value.id ? "Save" : "Add New Row"}</Button> </td>
                                    </tr>
                                    {value.Alldata.map(product => {
                                        return (
                                            <tr>
                                                <td>
                                                    {product.title}
                                                </td>
                                                <td>
                                                    {product.info}
                                                </td>
                                                <td>
                                                    {product.author}
                                                </td>
                                                <td>
                                                    {product.price}
                                                </td>
                                                <td>
                                                    <Button size="sm" variant="primary" onClick={()=>{value.onEdit(product.id)}}>Edit</Button> | <Button size="sm" variant="danger" onClick={()=>{value.onDelete(product.id)}}>Delete</Button>
                                                    
                                                </td>
                                            </tr>

                                            
                                        )
                                    } )}
                                </tbody>
                            </Table>
                        )
                    }}
                </ProductConsumer>
            </div>
        );
    }
}

export default Home;
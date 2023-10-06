import React, { Component } from 'react';
import { rowData } from './appData';

const ProductContext = React.createContext();
class ProductProvider extends Component {

    state = {
        Alldata : rowData,
        id : '',
        title :'',
        info : '',
        author :'',
        updateEdit :[]
    }

    getRecord = (id) =>{
        const product = this.state.Alldata.find(item =>item.id === id);
        return product;
    }

    onEdit = (id) =>{
        const tempProduct  = this.state.Alldata;
        const index = tempProduct.indexOf(this.getRecord(id));
        const selectedRecord = tempProduct[index];
        this.setState({
            id : selectedRecord['id'],
            title : selectedRecord['title'],
            info : selectedRecord['info'],
            price : selectedRecord['price'],
            author : selectedRecord['author']
        })
    }


    updateValue = (e ,test)=>{
        if (test === 'title'){
            this.state.title = e.target.value;
        }
        if (test === 'info'){
            this.state.info = e.target.value;
        }
        if (test === 'price'){
            this.state.price = e.target.value;
        }
        if (test === 'author'){
            this.state.author = e.target.value;
        }
        const tempArr = [this.state.id,this.state.title,this.state.info,this.state.price,this.state.author];

        this.setState({
            updateEdit : tempArr
        })
    }


    onSave = (id) =>{
        if (id!==''){
            const SavedRecord = this.state.Alldata;
            const index = SavedRecord.indexOf(this.getRecord(id));
            const Record = SavedRecord[index];
            Record['title'] = this.state.updateEdit[1];
            Record['info'] = this.state.updateEdit[2];
            Record['price'] = this.state.updateEdit[3];
            Record['author'] = this.state.updateEdit[4];
            this.setState({
                Alldata : [...this.state.Alldata],
                id:"",title:"",info:"",price:"",author :""
            })
        }else{
            const MaxId = Math.max(...this.state.Alldata.map(item =>item.id));
            const id = MaxId +1;
            const newArr = [];
            newArr['title'] = this.state.updateEdit[1];
            newArr['info'] = this.state.updateEdit[2];
            newArr['price'] = this.state.updateEdit[3];
            newArr['author'] = this.state.updateEdit[4];
            this.setState({
                Alldata : [...this.state.Alldata, newArr],
                id:"",title:"",info:"",price:"",author :""
            })
        }
    }
    onDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        
        if (confirmed) {
          const tempProduct = this.state.Alldata.filter(item => item.id !== id);
          this.setState({
            Alldata: tempProduct
          });
        }
      }
      
      
    render() {
        //console.log(this.state.Alldata);
        return (
            <div>
            <ProductContext.Provider 
                value={{...this.state,
                onEdit : this.onEdit ,
                updateValue :this.updateValue,
                onSave : this.onSave,
                onDelete:this.onDelete,

                }}>
                    
                    {this.props.children}

                </ProductContext.Provider> 
                
            </div>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer}
export default ProductProvider;

import React from "react";

export default class PictureDisplay extends React.Component {


    erase=()=>{
       

       let confirmation= window.confirm("Once done this action can not be undone. Are you sure?");
       if (confirmation){
        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
          
          fetch(`http://localhost:6060/api/shops/${this.props.activeShop}/pictures`, requestOptions)
            .then(response => response.text())
            .then(result => alert(result))
            .catch(error => console.log('error', error));
       }
window.location.reload();
    }
    render() {

        return (
            <div className="pictureDisplay">
                <div className="tableWrapper">
                <table>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Date Added</th>
                    </tr>
                    {this.props.gallery.map((picture)=><tr key={picture.id}>
                        <td>{picture.id}</td>
                        <td>{picture.title}</td>
                        <td>{picture.author}</td>
                        <td>{picture.price}</td>
                        <td>{picture.addedDate}</td>
                    </tr>)}
                    </tbody>
                </table>
                </div>
                <div className="buttonWrapper">
                <button className="button split" onClick={() => this.props.toggleMenu("pictures")}>Add Picture to Shop</button>
                <button className="button split erase" onClick={this.erase}>Erase Gallery</button>
                </div>
            </div>

        )

    }



}
import React, {Component} from "react";

export  default class User extends Component{
    render(){
        return (
            <tr onDoubleClick={this.props.onDoubleClick}>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.age}</td>
                <td>
                    <button className="btn btn-info" onClick={this.props.onDelete}>删除</button>
                </td>
            </tr>
        )
    }
}
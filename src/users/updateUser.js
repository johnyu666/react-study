import React, {Component} from "react";

export  default class UpdateUser extends Component{
    constructor(props){
        super(props);
        this.state={user:this.props.user};
        this.onChangeHandle=this.onChangeHandle.bind(this);
    }
    onChangeHandle(e){
        this.state.user[e.target.name]=e.target.value;
        this.setState({user:this.state.user});
    }
    render(){
        return (<div>
            <form action="#" onSubmit={this.props.onUpdate}>
                <input type="text" name="name" value={this.state.user.name} onChange={this.onChangeHandle}/>
                <input type="decimal" name="age" value={this.state.user.age} onChange={this.onChangeHandle}/>
                <input type="submit"/>
            </form></div>);
    }
}

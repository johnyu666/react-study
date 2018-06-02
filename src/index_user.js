import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import User from './users/user';
import UpdateUser from './users/updateUser';
import AddUser from './users/addUser';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class App extends Component{
    constructor(props){
        super(props);
        this.state={users:[{id:1,name:'john',age:100},{id:2,name:'tom',age:20}]};
        this.currentUser={};
        this.user={};
        this.updateRef=React.createRef();
        this.addRef=React.createRef();
    }
    render(){
        return (<div>
            <AddUser ref={this.addRef} onSubmit={(e)=>{this.onSubmitHandle(e)}}/>
            <table className="table table-striped table-hover">
                <tbody>
            {this.state.users.map((user)=> <User onDoubleClick={()=>this.onDoubleClickUpdateHandle(user)} user={user} onDelete={()=>this.onDeleteHandle(user)} key={user.id}/>)}
                </tbody>
            </table>
            <UpdateUser onUpdate={(e)=>this.onUpdateUser(e,this.currentUser)} user={this.currentUser} ref={this.updateRef}/>
        </div>)
    }
    onDeleteHandle(user){
        let index=this.state.users.indexOf(user);
        this.state.users.splice(index,1);
        this.setState({users:this.state.users});
    }
    onDoubleClickUpdateHandle(user){
        this.currentUser=user;
        this.updateRef.current.setState({user:Object.assign(this.user,this.currentUser)});
        //this.updateRef.current.forceUpdate(()=>{});
    }
    onUpdateUser(e,user){
        e.preventDefault();
        Object.assign( this.currentUser,this.user);
        this.setState({users:this.state.users});
    }
    onSubmitHandle(e){
        let user={};
        user.name=this.addRef.current.ref.name.value;
        user.age=this.addRef.current.ref.age.value
        this.state.users.push(user);
        this.setState({users:this.state.users});
        e.preventDefault();
    }
}

ReactDOM.render(<App name="john"/>,$("#root")[0]);
import React,{Component} from 'react';


export default class AddUser extends Component{
    constructor(props){
        super(props);
        this.ref={};
        this.state={nameTip:'',ageTip:''};
    }
    render(){
        return (<form action="#" onSubmit={(e)=>this.onSubmitHandle(e)}>
            <input type="text" ref={(input)=>this.ref.name=input}/>
            <span>{this.state.nameTip}</span>
            <br/>
            <input type="decimal" ref={(input)=>this.ref.age=input}/>
            <input type="submit"/>
            <button className="btn btn-primary">test</button>
        </form>)
    }
    onSubmitHandle(e){
        console.log(this.ref.name.value);
        if(this.ref.name.value.trim().length<3){
            this.setState({nameTip:"名字太短"});
            e.preventDefault();
            return;
        }
        this.setState({nameTip:""});
        this.props.onSubmit(e);
    }
}
import React from "react";
import Addoption from "./AddOption"
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import OptionModal from "./OptionModal";

class IndecisionApp extends React.Component {
    state = {
        options: [],
        error: undefined,
        selectedOption:undefined
    }
    //lifecycle method(automatically runs)
    componentDidMount(){
        const json=localStorage.getItem('options');
        const options=JSON.parse(json);
        this.setState(()=>{
            return this.state.options=options
        })
    }
    componentDidUpdate(prevProps,prevState){
        const json=JSON.stringify(this.state.options);
        localStorage.setItem('options',json);
    }


    //handle delete
    handledeleteall=()=> {
        this.setState(() => {
            return {
                options: []
            }
        })
    }
    //remove one option
    handledeletesingle=(optiontoremove)=> {
       this.setState( {
            options:this.state.options.filter((option2)=>{
                    return optiontoremove!==option2
            })
       })
    }
    //handlepick
    handlePick=()=> {
        const randomnum = Math.floor(Math.random() * (this.state.options.length));
        const option = this.state.options[randomnum];
        this.setState(()=>{
            return this.state.selectedOption=option;
        })
    }

    //clearselectedoption
    clearoption=()=>{
         this.setState(()=>{
             return this.state.selectedOption=!!undefined;
         })
    }

    //add option
    addoption=(e)=> {
        e.preventDefault();
        let error1 = undefined;
        this.setState(() => {
            this.state.error = undefined;
        })
        const option = e.target.elements.option.value.trim();
        if (!option) {
            error1 = "enter valid value"
        }
        else if (this.state.options.indexOf(option) > -1) {
            error1 = "the option already exist"
        }
        if (option && error1 === undefined) {
            this.state.options.push(option)
            this.setState(() => {
                return this.state.options;
            })
            e.target.elements.option.value = "";

        }
        if (error1) {
            this.setState(() => {
                return this.state.error = error1;
            })
        }

    }

    render() {
        const title = "Indesicion";
        const subtitle = 'Put your life in the hands of computer';
        return (<div>
            <Header
                title={title}
                subtitle={subtitle}
            />
           <div className='container'> 
           <Action
                hasoptions={this.state.options.length > 0}
                handlePick={this.handlePick}
            />
            <div className='widget'>
            <Options
                options={this.state.options}
                handledeletesingle={this.handledeletesingle}
                handledeleteall={this.handledeleteall}
            />
            <Addoption
                error={this.state.error}
                addoption={this.addoption}
            />
            </div>
            <OptionModal 
            selectedOption={this.state.selectedOption}
            clearoption={this.clearoption}
            />
           </div>
        </div>
        );
    }
}

export default IndecisionApp;
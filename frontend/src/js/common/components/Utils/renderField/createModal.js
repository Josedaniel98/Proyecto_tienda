import React, {Component} from 'react';
import AsyncCreatableSelect from "react-select/lib/AsyncCreatable";

export default class CreateModal extends Component{
    state = {
        isLoading: false,            
    };

    handleCreate = async (inputValue) => {
        this.setState({ isLoading: true });
        const {showForm} = this.props;
        showForm(true);                

    };

    render() {
        const { isLoading} = this.state;                
        const {loadOptions, show_form, input, disabled} = this.props;
        
        return (
            <React.Fragment>
                <div className='d-flex flex-column w-50'>
                    {show_form && this.props.children}
                </div>
                <AsyncCreatableSelect
                    isClearable
                    cacheOptions
                    defaultOptions
                    //isDisabled={isLoading}
                    isDisabled={show_form || disabled}
                    isLoading={isLoading}                
                    loadOptions={loadOptions}                    
                    onChange={(e) => { input.onChange(e ? e : null); }}
                    onCreateOption={this.handleCreate}                    
                    value={input.value}
                />
            </React.Fragment>
        );
    }
} 
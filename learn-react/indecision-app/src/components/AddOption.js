import React from 'react';
class Addoption extends React.Component {
    render() {
        return (
            <div>
                {this.props.error && <p className='addoptionerror'>{this.props.error}</p>}
                <form className='add-option' onSubmit={this.props.addoption}>
                    <input className='add-option__input' type='text' name='option' />
                    <button className='button'>Add option</button>
                </form>
            </div>
        )
    }
}

export default Addoption;
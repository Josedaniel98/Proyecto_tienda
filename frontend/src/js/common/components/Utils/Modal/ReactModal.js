import React, {Component} from 'react';
import Modal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '55%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '50%'
  }
};

Modal.setAppElement('#app-container')

class ReactModal extends Component{
    state={
        modalIsOpen: false,        
    }
    
    subtitle = React.createRef()

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }    

    afterOpenModal = () => {
        this.subtitle.current.style.color = '#000000';
    }

    render(){
        const {modalIsOpen} = this.state;
        const {showModal} = this.props;
        
        return (
            <div>
                <Modal
                    isOpen={showModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    /* shouldCloseOnOverlayClick={false} */
                >
                    <h2 
                        ref={this.subtitle}
                    >
                        Agregar
                    </h2>                    
                    {this.props.children}    
                </Modal>
            </div>
          );        
    }
}

export default ReactModal;
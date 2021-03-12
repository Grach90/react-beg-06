import React from "react";

const withScreenSizes = (Component) => {
    return class extends React.Component {
        state = {
          width: window.innerWidth
        }

        handleResize = () => {
            this.setState({
              width: window.innerWidth
            })
        }

        componentDidMount(){
          window.addEventListener("resize", this.handleResize);
        };

        // componentWillUnmount(){
        //   window.removeEventListener("resize", this.handleResize);
        // };

        render() {
          return <Component {...this.props} width={this.state.width} />
        }

      }
    
}

export default withScreenSizes;


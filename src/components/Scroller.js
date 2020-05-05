import React from 'react'
import { FaCircleNotch } from 'react-icons/fa'

class Scroller extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sliceSize: this.props.sliceSize,
      currentSlice: this.props.sliceSize,
      loading: false
    }
  }
  componentDidMount = () => {
    document.addEventListener('scroll', this.trackScrolling);
  }
  componentDidUpdate = () => {
    document.addEventListener('scroll', this.trackScrolling);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  trackScrolling = () => {
    const wrappedElement = document.getElementById('scroller');
    if (this.isBottom(wrappedElement)) {
      if (this.state.currentSlice < this.props.children.length) {
        this.setState(() => ({ loading: true }))
        const self = this;
        setTimeout(function() {
          self.setState(() => ({
            currentSlice: parseInt(self.state.currentSlice) + parseInt(self.props.sliceSize),
            loading: false
          }))
        }, 100)
      }
      document.removeEventListener('scroll', this.trackScrolling);
    }
  }
  render() {
    return (
      <div id="scroller" className={this.props.className}>
        {this.props.children.slice(0, this.state.currentSlice)}
        {this.state.loading && <div className="loading__notificaton">Fetching more coins<FaCircleNotch size="2.4rem" className="fa-spin" /></div>}
      </div>
    )
  }
}

export default Scroller;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, } from "react-native";
import { View } from "react-native-animatable";
import moment from "moment";
class CalendarHeader extends Component {
  static propTypes = {
    calendarHeaderFormat: PropTypes.string.isRequired,
    calendarHeaderContainerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    calendarHeaderStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    weekStartDate: PropTypes.object,
    weekEndDate: PropTypes.object,
    allowHeaderTextScaling: PropTypes.bool,
    fontSize: PropTypes.number,
    headerText: PropTypes.string,
    onHeaderSelected: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  //Function that formats the calendar header
  //It also formats the month section if the week is in between months
  formatCalendarHeader(calendarHeaderFormat,index) {
    if (!this.props.weekStartDate || !this.props.weekEndDate) {
      return null;
    }

    const firstDay = this.props.weekStartDate;
    let month = moment(firstDay).month()
    return  <TouchableOpacity key={index} onPress={()=>this.props.onDateSelected(moment().date(1).month(month).add(index, 'months'))}>
    <View style={{flexDirection:"row",alignItems:"center"}}>
     {index==0 && <View style={{
        width:5,
        height:5,
        backgroundColor:'black',
        borderRadius:5,
        
      }} />}
      <View style={{
        paddingLeft:3
      }}>
      <Text style={{
        fontSize:16,
        fontFamily:"Avenir-Heavy",
        color:index==0?"black":"white"
      }}>{moment().month(month).add(index, 'months').format("MMM")}</Text>
      </View>
    </View></TouchableOpacity>
    
  }


  render(){
        const {
      calendarHeaderFormat,
      onHeaderSelected,
      calendarHeaderContainerStyle,
      calendarHeaderStyle,
      fontSize,
      allowHeaderTextScaling,
      weekStartDate: _weekStartDate,
      weekEndDate: _weekEndDate,
      headerText,
    } = this.props;
    const _headerText = this.formatCalendarHeader(calendarHeaderFormat);
    
    return <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:16}}>
      {[0,1,2,3,4].map((item)=>this.formatCalendarHeader(calendarHeaderFormat,item))}
     
    </View>
  }

  
}

export default CalendarHeader;

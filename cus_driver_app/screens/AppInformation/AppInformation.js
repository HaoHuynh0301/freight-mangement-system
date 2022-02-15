/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {newIcon} from '../../contants';
import styles from './appInfor.style';
import {DIEUKHOAN_CONSTANTS, NEWS_CONTSTANTS} from './appInfor.constants';
import Header from '../Header';

class AppInformation extends Component {
  constructor(props) {
    super(props);
  }

  renderDieuKhoan = () => {
    <View style={styles.dieuKhoanWrapper}>
      {DIEUKHOAN_CONSTANTS.map((item, index) => {
        return (
          <View style={styles.dieuKhoanDetail} key={index}>
            <Text style={styles.textInformation}>{item}</Text>
          </View>
        );
      })}
    </View>;
  };

  renderQuestions = () => {
    <View style={styles.questionsWrapper}>
      <View style={styles.questionTitleWrapper}>
        <Text style={styles.questionTitleText}>Những câu hỏi thường gặp</Text>
      </View>
    </View>;
  };

  renderNews() {
    return (
      <View styles={styles.newsWrapper}>
        <View style={styles.newsDetailWrapper}>
          <View style={styles.newTitleWrapper}>
            <Image source={newIcon} style={styles.newIcon} />
            <Text style={styles.newTitle}>THÔNG BÁO ĐANG LÀM ĐỀ TÀI</Text>
          </View>
          {NEWS_CONTSTANTS.map((item, index) => {
            return <Text style={styles.textInformation}>{item}</Text>;
          })}
        </View>
      </View>
    );
  }

  renderMainView() {
    const title = this.props.route.params.title;
    title === 'Điều khoản và quy định'
      ? this.renderDieuKhoan()
      : this.renderQuestions();
    return this.renderNews();
  }

  render() {
    return (
      <SafeAreaView>
        {<Header styles={styles} />}
        {this.renderMainView()}
      </SafeAreaView>
    );
  }
}

export default AppInformation;

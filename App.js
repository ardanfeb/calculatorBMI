import React, {Component} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TextInput, View, ScrollView } from 'react-native'

export default class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tb: '',
			bb: '',
			usia: '',
			gender: '',
			hasilbmr: '0',
			hasilbmi: '0',
			keteranganbmi: ''
		}
	}
	
	penghitunganBMR(gender, age, height, weight) {
		let bmr, bmi, ket;

		if (gender == 'laki-laki') {
			bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
			bmi = weight / ((height/100) * (height/100));
		} else {
			bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
			bmi = weight / ((height/100) * (height/100));
		}

		if (bmi < 17) {
			ket = "Kurus, Kekurangan berat badan berat";
		} else if (bmi < 18.4) {
			ket = "Kurus, Kekurangan berat badan ringan";
		} else if (bmi < 25) {
			ket = "Normal";
		} else if (bmi < 27) {
			ket = "Gemuk, Kelebihan berat badan tingkat ringan";
		} else {
			ket = "Gemuk, kelebihan berat badan tingkat berat";
		}

		this.setState({ 
			hasilbmr: bmr, 
			hasilbmi: bmi, 
			keteranganbmi: ket 
		});
	}

	viewInput() {
		const { gender, tb, bb, usia } = this.state;
		
		return (
			<View>
				{/* Title */}
				<Text style={[styles.txtBold, { fontSize: 17, marginBottom: 30, textAlign: 'center' }]}>BMI & BMR Calculator</Text>

				{/* Gender */}
				<View style={{ flexDirection: 'row', marginBottom: 20 }}>

					{/* Laki */}
					<TouchableOpacity
						style={[gender == 'laki-laki' ? styles.btnChoose : styles.btnDefault, { flex: 1, marginRight: 10 }]}
						onPress={() => this.setState({ gender: 'laki-laki' })}>

						<Image source={require('./assets/boy.png')} style={{ height: 50, width: 50, marginBottom: 10 }} />
						<Text style={styles.txtBold}>Laki-Laki</Text>

					</TouchableOpacity>

					{/* Perempuan */}
					<TouchableOpacity
						style={[gender == 'perempuan' ? styles.btnChoose : styles.btnDefault, { flex: 1, marginLeft: 10 }]}
						onPress={() => this.setState({ gender: 'perempuan' })}>

						<Image source={require('./assets/girl.png')} style={{ height: 50, width: 50, marginBottom: 10 }} />
						<Text style={styles.txtBold}>Perempuan</Text>

					</TouchableOpacity>

				</View>

				{/* Age, Height & Weight */}
				<View style={{ flexDirection: 'row', marginBottom: 40 }}>

					{/* Age */}
					<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<TextInput
							style={{ fontSize: 15, fontFamily: 'Lato-Bold', flex: 1, height: 50, textAlign: 'center' }}
							placeholder="0"
							keyboardType='numeric'
							onChangeText={(usia) => this.setState({ usia })}
							value={usia}
						/>
						<Text style={styles.txtBold}>Usia</Text>
					</View>

					{/* Height */}
					<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<TextInput
							style={{ fontSize: 15, fontFamily: 'Lato-Bold', flex: 1, height: 50, textAlign: 'center' }}
							placeholder="0"
							keyboardType='numeric'
							onChangeText={(tb) => this.setState({ tb })}
							value={tb}
						/>
						<Text style={styles.txtBold}>Height (cm)</Text>
					</View>

					{/* Weight */}
					<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<TextInput
							style={{ fontSize: 15, fontFamily: 'Lato-Bold', flex: 1, height: 50, textAlign: 'center' }}
							placeholder="0"
							keyboardType='numeric'
							onChangeText={(bb) => this.setState({ bb })}
							value={bb}
						/>
						<Text style={styles.txtBold}>Weight (kg)</Text>
					</View>
				</View>

				{/* Submit */}
				<TouchableOpacity
					style={[styles.btnSubmit, { flex: 1, marginBottom: 20 }]}
					onPress={() => this.penghitunganBMR(gender, usia, tb, bb)}>
					<Text style={{ color: 'white', fontWeight: 'bold' }}>Proses</Text>
				</TouchableOpacity>
			</View>
		);
	}

	viewHasil() {
		const { hasilbmr, hasilbmi, keteranganbmi } = this.state;

		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>

				{/* Kembali */}
				<TouchableOpacity style={styles.btnBack} onPress={() => this.setState({ hasilbmr: '0', hasilbmi: '0' })}>
					<Text style={{ fontWeight: 'bold' }}>Kembali</Text>
				</TouchableOpacity>

				{/* Hasil BMR */}
				<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.txtBold}>Kebutuhan kalori anda :</Text>
					
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems:'flex-end'}}>
						<Text style={[styles.txtBold, { color: '#3ec6f9', fontSize: 50, marginRight: 5 }]}>{hasilbmr.toFixed(2)}</Text>
						<Text style={styles.txtBold}>Kalori/Hari</Text>
					</View>
				</View>

				{/* Garis */}
				<View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1 }} />

				{/* Hasil BMI */}
				<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.txtBold}>Nilai BMI anda :</Text>
					<Text style={[styles.txtBold, { color: '#3ec6f9', fontSize: 50, marginRight: 5 }]}>{hasilbmi.toFixed(2)}</Text>
					<Text style={styles.txtBold}>{keteranganbmi}</Text>
				</View>
			</View>
		);
	}

	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ flex: 1, flexDirection: 'column', padding: 20,  backgroundColor: '#fff' }}>
					{this.state.hasilbmi == '0' ? this.viewInput() : this.viewHasil()}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	btnChoose: {
		borderRadius: 13,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: '#3ec6f9',
		backgroundColor: '#eee',
		// elevation: 0.8,
	},
	btnDefault: {
		backgroundColor: '#fff',
		borderRadius: 13,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: '#eee',
		// elevation: 0.8,
	},
	btnBack: {
		alignSelf:'flex-start',
		justifyContent: 'center',
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 13,
		height: 30,
		backgroundColor: '#ccc',
		elevation: 0.8,
	},
	btnSubmit: {
		backgroundColor: '#3ec6f9',
		height: 40,
		borderRadius: 13,
		color: '#fff',
		elevation: 0.8,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
	}, 
	txtBold: {
		fontFamily: 'Lato-Bold',
	},
	txtReg: {
		fontFamily: 'Lato-Regular',
	}
})

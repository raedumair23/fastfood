import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';
import theme from '../constants/theme';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('Raed');
  const [lastName, setLastName] = useState('Khan');
  const [email, setEmail] = useState('raed@example.com');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [address, setAddress] = useState('123 Food Street, Karachi');
  const [bio, setBio] = useState('Food lover | React Native Dev');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const nameRegex = /^[a-zA-Z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+92\d{10}$/;

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email.trim())) newErrors.email = 'Invalid email address';

    const cleanedPhone = phone.replace(/\s+/g, '');
    if (!cleanedPhone) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(cleanedPhone)) newErrors.phone = 'Phone must start with +92 and have 10 digits';

    if (!address.trim()) newErrors.address = 'Address is required';
    if (!bio.trim()) newErrors.bio = 'Bio is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CustomText variant="title">My Profile</CustomText>

        <CustomCard
          avatar
          name={`${firstName} ${lastName}`}
          subtitle={email}
          description={bio}
          showPrice={false}
        />

        <View style={styles.formCard}>
          <CustomText variant="section">Basic Info</CustomText>
          <CustomTextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            editable={isEditing}
            placeholder="Enter your first name"
            error={errors.firstName}
          />
          <CustomTextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            editable={isEditing}
            placeholder="Enter your last name"
            error={errors.lastName}
          />

          <CustomText variant="section">Contact</CustomText>
          <CustomTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
            keyboardType="email-address"
            placeholder="Enter your email"
            error={errors.email}
          />
          <CustomTextInput
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            editable={isEditing}
            keyboardType="phone-pad"
            placeholder="Enter your phone number"
            error={errors.phone}
          />
          <CustomTextInput
            label="Address"
            value={address}
            onChangeText={setAddress}
            editable={isEditing}
            placeholder="Enter your address"
            error={errors.address}
          />

          <CustomText variant="section">Bio</CustomText>
          <CustomTextInput
            label="About You"
            value={bio}
            onChangeText={setBio}
            editable={isEditing}
            multiline
            placeholder="Tell us about yourself"
            error={errors.bio}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <CustomButton
            title={isEditing ? 'Save' : 'Edit'}
            onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
           
          />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    elevation: 5,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

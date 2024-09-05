import { faTruckFieldUn } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { boolAtom } from './Loged';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// STATE-DATA
// STATE-DATA
// STATE-DATA
// STATE-DATA

const stateData = {
    "Andhra Pradesh": ["Anantapur", "Chittoor", "Guntur", "Kadapa", "Krishna", "Nellore", "East Godavari", "West Godavari", "Srikakulam", "Vizianagaram", "Visakhapatnam"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Naharlagun", "Changlang", "Anjaw", "Kurung Kumey", "Lohit"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Tezpur", "Jorhat", "Bongaigaon", "Nagaon", "Karimganj", "Hailakandi", "Dhemaji"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Munger", "Nalanda", "Jehanabad", "Saran"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Rajnandgaon", "Jagdalpur", "Kanker", "Surguja", "Janjgir-Champa", "Dhamtari"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Quepem", "Sanguem", "Canacona", "Salcete", "Bardez"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Junagadh", "Bhavnagar", "Mehsana", "Patan", "Porbandar"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar", "Karnal", "Yamunanagar", "Jind", "Rohtak", "Sonipat"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Solan", "Mandi", "Kangra", "Bilaspur", "Hamirpur", "Una"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Dumka", "Chatra", "Pakur"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Udupi", "Hubli", "Dharwad", "Bellary", "Shimoga", "Chikmagalur", "Raichur"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha", "Kollam", "Palakkad", "Kannur", "Wayanad", "Idukki"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Satna", "Rewa", "Burhanpur", "Mandsaur"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Kolhapur", "Jalgaon", "Amravati", "Solapur"],
    "Manipur": ["Imphal", "Churachandpur", "Thoubal", "Bishnupur", "Kakching", "Senapati", "Tamenglong", "Ukhrul", "Jiribam", "Kangpokpi"],
    "Meghalaya": ["Shillong", "Tura", "Nongpoh", "Jowai", "Williamnagar", "Brihat", "Mairang", "Nongstoin", "Bholaganj", "Mawkyrwat"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Mamit", "Saiha", "Hnahthial", "Lawngtlai", "Lunglei"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Peren", "Zunheboto", "Mon", "Longleng", "Kiphire"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Berhampur", "Sambalpur", "Balasore", "Koraput", "Ganjam", "Khurda"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Mohali", "Hoshiarpur", "Rupnagar", "Fatehgarh Sahib", "Bathinda"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Sikar", "Pali", "Churu"],
    "Sikkim": ["Gangtok", "Namchi", "Geyzing", "Mangan", "Rangpo", "Yuksom", "Khamdong", "Tadong", "Pakyong", "Lachung"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Tirunelveli", "Thanjavur", "Vellore", "Erode", "Kanchipuram"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Mahbubnagar", "Nalgonda", "Medak", "Rangareddy", "Adilabad"],
    "Tripura": ["Agartala", "Udaipur", "Kailashahar", "Dharmanagar", "Ambassa", "Khowai", "Belonia", "Sepahijala", "North Tripura", "South Tripura"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut", "Aligarh", "Ghaziabad", "Bareilly", "Moradabad", "Firozabad"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Roorkee", "Udham Singh Nagar", "Tehri Garhwal", "Pauri Garhwal", "Champawat", "Bageshwar", "Pithoragarh"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol", "Kharagpur", "Burdwan", "Malda", "Jalpaiguri", "Medinipur"],
    "Andaman and Nicobar Islands": ["Port Blair", "Car Nicobar", "Havelock Island", "Diglipur", "Mayabunder", "Little Andaman", "Nicobar", "South Andaman", "North Andaman", "Middle Andaman"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy", "Amini", "Andrott", "Kalapeni", "Suheli Par", "Maliku Atoll", "Viringili", "Cheriyam"],
    "Delhi": ["New Delhi", "Central Delhi", "South Delhi", "East Delhi", "North Delhi", "West Delhi", "North East Delhi", "North West Delhi", "South West Delhi", "Shahdara"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    "Ladakh": ["Leh", "Kargil"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Pulwama", "Kathua", "Doda", "Udhampur", "Rajouri", "Poonch"]
};




// CUSTOM DROP-DROP
// CUSTOM DROP-DROP
// CUSTOM DROP-DROP
// CUSTOM DROP-DROP

const CustomDropdown = ({ items, onSelect, placeholder, searchValue, onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const handleItemClick = (item) => {
        onSelect(item);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <input
                type="text"
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <ul className="absolute top-full left-0 w-full border bg-white shadow-lg mt-1 rounded-md max-h-60 overflow-auto">
                    {items.length === 0 ? (
                        <li className="px-4 py-2 text-gray-500">No results</li>
                    ) : (
                        items.map((item) => (
                            <li
                                key={item}
                                onClick={() => handleItemClick(item)}
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            >
                                {item}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};




// SIGN-UP-COMPONENT
// SIGN-UP-COMPONENT
// SIGN-UP-COMPONENT
// SIGN-UP-COMPONENT
// SIGN-UP-COMPONENT


const SignUpComponent = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [farmName,setFarmName] = useState('')
    // const [farmLocation,setFarmLocation] = useState([])
    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const [pincode, setPincode] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [stateSearch, setStateSearch] = useState('');
    const [districtSearch, setDistrictSearch] = useState('');
    const [filteredStates, setFilteredStates] = useState(Object.keys(stateData));
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [state,setState] = useState(false)
    const [dist,setDist] = useState(false)
    const Navigate = useNavigate()


    // IF SIGNED IN THEN CLEAN FROM THE HEADER SIGNUP AND LOGIN TAG--
    // IF SIGNED IN THEN CLEAN FROM THE HEADER SIGNUP AND LOGIN TAG--
    const setMyBoolean = useSetRecoilState(boolAtom);
    const bool = useRecoilValue(boolAtom)

    const toggleBoolean = () => {
        console.log(bool)
        setMyBoolean(prev => !prev);
        console.log(bool)
    };



    const HandleSubmit = async () => {

        try{
            if(username == "" || password == "" || firstName == "" || lastName == "" || farmName == "" ||pincode == "" || selectedState == "" || selectedDistrict == ""){
                console.log("fill full form Properly")
                alert("Fill the Form Properly!!")
            }else{
                fetch('http://localhost:5000/sign',{
                    method: 'POST',
                    body: JSON.stringify({
                        email: username,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        farmName: farmName,
                        // orderHistory: ,
                        expenditure: 0,
                        income: 0,
                        profit: 0,
                        loss: 0,
                        farmLocation: [{
                            pincode: parseInt(pincode, 10), // Ensure pincode is an integer
                            state: selectedState,
                            district: selectedDistrict
                        }]
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(async function(res){
                    if(res){
                        const js = await res.json()
                        console.log("JS",js)
                        toggleBoolean()  // Call function Toggle to make TRUE & unseen Signup And LOgin tag
                        Navigate('/')
                    }
                    else{
                        alert("Fill the form Properly")
                        console.log("not signup")
                    }
                })
            }

        }catch(err){
            console.log("ERR",err)
            alert('Error in Fetching')
        }
        

    };



    ////PINCODE
    ////PINCODE
    ////PINCODE
    ////PINCODE


    // const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,6}$/.test(value)) { // Validate input to ensure it has at most 6 digits
            setPincode(value);
            setError((value.length === 6 || value.length === 0) ? '' : 'Pincode must be 6 digits long');
        }
        else {
            setError('Invalid pincode');
        }
    };


    const handleChangeEmail = (e) => {
        const value = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for basic email validation
    
        // // Validate input to ensure it matches the email format
        setUsername(value);
        if (emailRegex.test(value)) {
            setErrorEmail(''); // Clear error if the email is valid
        }else if(value == ""){
            setErrorEmail('')
        }
        else {
            setErrorEmail('Invalid email address');
        }
        
    };

    const handleChangePassword = ()=>{

    }


    
    




    //LOCATION
    //LOCATION
    //LOCATION
    //LOCATION
    //LOCATION
    
    useEffect(() => {
        setFilteredStates(Object.keys(stateData).filter(state =>
            state.toLowerCase().includes(stateSearch.toLowerCase())
        ));
    }, [stateSearch]);

    useEffect(() => {
        if (selectedState) {
            setFilteredDistricts(stateData[selectedState].filter(district =>
                district.toLowerCase().includes(districtSearch.toLowerCase())
            ));
        } else {
            setFilteredDistricts([]);
        }
    }, [selectedState, districtSearch]);

    const handleStateSelect = (state) => {
        setSelectedState(state);
        setStateSearch(''); // Clear search input when state is selected
        setState(true)
    };

    const handleDistrictSelect = (district) => {
        setSelectedDistrict(district);
        setDist(true)
    };









    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 pt-12">
    <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="space-y-4">
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleChangeEmail}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errorEmail && <p className="mx-2 text-red-500 text-sm">{errorEmail}</p>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errorPass && <p className="px-2 text-red-500 text-sm">{errorPass}</p>}
            </div>
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="FirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="flex-1 w-20 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="LastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="flex-1 w-20 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="FarmName"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <p className="text-gray-700">Farm Location:</p>
                {/* <PincodeInput /> */}





                {/* //// PINCODE
                //// PINCODE
                //// PINCODE */}
                <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md space-y-4">
            <label htmlFor="pincode" className="block text-gray-700 font-semibold">
                Pincode:
            </label>
            <input
                type="text"
                id="pincode"
                value={pincode}
                onChange={handleChange}
                placeholder="Enter 6-digit pincode"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                maxLength="6"
                pattern="\d{6}"
                title="Pincode must be a 6-digit number"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>



                

                {/* LOCATION 
                    LOCATION 
                    LOCATION */}
        <form className=" max-w-lg mx-auto p-4 bg-white shadow-md rounded-md space-y-6">
            {/* State Input Section */}
            <div className='flex'>
            <div className="space-y-2">
                <label htmlFor="state" className="block text-gray-700 font-semibold">
                    State:
                </label>
                <CustomDropdown
                    items={filteredStates}
                    onSelect={handleStateSelect}
                    placeholder={`${state ? selectedState : "select state"}`}
                    searchValue={stateSearch}
                    onSearch={setStateSearch}
                />
            </div>

            {/* District Input Section */}
            <div className="space-y-2">
                <label htmlFor="district" className="block text-gray-700 font-semibold">
                    District:
                </label>
                <CustomDropdown
                    items={filteredDistricts}
                    onSelect={handleDistrictSelect}
                    placeholder={`${dist ? selectedDistrict : "select state"}`}
                    searchValue={districtSearch}
                    onSearch={setDistrictSearch}
                />
            </div>
            </div>
            {/* Submit Button */}

        </form>







                {/* <AddressForm /> */}
            </div>
            <button
                className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={HandleSubmit}
            >
                Sign Up
            </button>
            <p className='m-2'>Already Have Account ? <a href='/login'className='text-blue-600 font-medium hover:underline'>Login</a></p>
        </div>
    </div>
</div>
    );
};










export default SignUpComponent;

const FIREBASE_DOMAIN = 'https://my-project-test-97564-default-rtdb.asia-southeast1.firebasedatabase.app/';

export async function getAllProducts(){
    const response = await fetch(`${FIREBASE_DOMAIN}/photoproducts.json`);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Could not fetch data');
    }
    const transformatedData = [];
    for (const key in data){
        const product = {
            id: key,
            name: data[key].name,
            img: data[key].img,
            brief: data[key].brief,
            price: data[key].price
        };
        transformatedData.push(product);
    }
    return transformatedData;
}

export async function getProductsByCatagory(value) {
    const response = await fetch(`${FIREBASE_DOMAIN}/photoproducts.json?orderBy="project"&equalTo="${value}"&print=pretty`);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Could not fetch data');
    }
    const transformatedData = [];
    for (const key in data){
        const product = {
            id: key,
            name: data[key].name,
            img: data[key].img,
            brief: data[key].brief,
            price: data[key].price
        };
        transformatedData.push(product);
    }
    return transformatedData;

}

export async function getSingleProduct(productId){
    const response = await fetch(`${FIREBASE_DOMAIN}/photoproducts/${productId}.json`);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Could not fetch data');
    }
    const transformatedData = {
        id: productId,
        name: data.name,
        img: data.img,
        description: data.description,
        brief: data.brief,
        price: data.price,
    };

    return transformatedData;
}

export async function postOrder(orderData,uid){
    const response = await fetch(`${FIREBASE_DOMAIN}/orders/${uid}.json`,{
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function authConnect(userData,isLogin){
    let url;
    if(isLogin){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAd6mNaHt3SZruBfE6hcYmlzJWDLZRiL6k';
    };
    if(!isLogin){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAd6mNaHt3SZruBfE6hcYmlzJWDLZRiL6k';
    };
    const response = await fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            email: userData.enteredEmail,
            password: userData.enteredPassword,
            returnSecureToken: true
        }),
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.error.message || 'Could not fetch data');
    }
    const transformatedData = {
            token: data.idToken,
            uid: data.localId
        };
    return transformatedData;
}

export async function getUserOrder(uid){
    const response = await fetch(`${FIREBASE_DOMAIN}/orders/${uid}.json`);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Could not fetch data');
    }
    const transformatedData = [];
    for (const key in data){
        const order = data[key];
        transformatedData.push(order);
    }
    return transformatedData;
}


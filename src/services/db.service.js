import { getDatabase, ref, set, child, push, update, remove, onValue, get } from "firebase/database";
import MD5 from "crypto-js/md5";

class DbService{
    db = getDatabase();

    writeUserData(email, uid, token) {
        const key = MD5(email).toString();
        return set(ref(this.db, 'users/' + key), {
            uid: uid,
            email: email,
            message_token: token
        });
    }

    getDeviceData(email){
        const key = MD5(email).toString();
        const devicesRef = ref(this.db, 'devices/' + key)

        return get(devicesRef).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    getLogsRef(email){
        const key = MD5(email).toString();
        const logsRef = ref(this.db, 'logs/' + key)
        return logsRef
    }

    pushUserData(name, email, imageUrl){
        const newData = {
            username: name,
            email: email,
            profile_picture : imageUrl
        }
        const newKey  = push(child(ref(this.db), 'users')).key;

        const updates = {};
        updates['/users/' + newKey] = newData;

        return update(ref(this.db), updates);
    }

    // updateUserToken(token){
    //     const updates = {};
    //     const user = this.$store.status.user;
    //     console.log(user);
    //     let key = MD5();
    //     updates['users/' + key + '/message_token'] = token;
    //     this.db.ref().update(updates);
    // }

    getUsers(){
        const usersRef = ref(this.db, 'users');
        onValue(usersRef, (snapshot) => {
            alert('changed');
            const data = snapshot.val();
            console.log(snapshot);
            console.log(data);
            return data;
        })
    }

    getUsersOnce(){
        get(child(ref(this.db), 'users')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    delete(userId){
        return remove(ref(this.db, 'users/' + userId))
    }
}

export default new DbService();
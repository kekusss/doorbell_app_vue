import { getDatabase, ref, set, child, push, update, remove, onValue, get } from "firebase/database";
import HashService from "./hash.service";

class DbService{
    db = getDatabase();

    writeUserData(email, uid, token) {
        const key = HashService.cyrb53(email);
        return set(ref(this.db, 'users/' + key), {
            uid: uid,
            email: email,
            message_token: token
        });
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

    updateUserData(){
        // function addStar(uid, key) {
        //     const updates = {};
        //     updates[`posts/${key}/stars/${uid}`] = true;
        //     updates[`posts/${key}/starCount`] = firebase.database.ServerValue.increment(1);
        //     updates[`user-posts/${key}/stars/${uid}`] = true;
        //     updates[`user-posts/${key}/starCount`] = firebase.database.ServerValue.increment(1);
        //     firebase.database().ref().update(updates);
        // }
    }

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
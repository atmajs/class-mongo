import { obj_patch } from '../src/utils/patchObject';

UTest({

    'should deep set' () {
        var json = {
            user: {
                code: {
                    name: 'A'
                }
            }
        };
        obj_patch(json, {
            $set: {
                'user.code.name': 'B'
            }
        });
        eq_(json.user.code.name, 'B');
    },

    'should patch array' () {
        let json = {
            foo: null
        };
        obj_patch(json, {
            $push: {
                foo: 1
            }
        });
        deepEq_(json.foo, [1]);
    }
})

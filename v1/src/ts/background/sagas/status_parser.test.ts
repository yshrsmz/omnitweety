import test from "ava";

import parseStatus, { IParsedStatus } from "./status_parser";

test("foo", t => {
    const result = parseStatus("-ts test");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "test"
        });
});

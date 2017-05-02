import test from "ava";

import parseStatus, { IParsedStatus } from "./status_parser";

test("short hand can be parsed", t => {
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

test("multiple options can be parsed", t => {
    const result = parseStatus("--twitter --share test status");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "test status"
        }
    );
});

test("unknown options should be treated as a part of status", t => {
    const result = parseStatus("--twitter --share --unknown test status");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "--unknown test status"
        }
    );
});

test("unknown shorthand options should be treated as a part of status", t => {
    const result = parseStatus("-tsu test status 123");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "-u test status 123"
        }
    );
});

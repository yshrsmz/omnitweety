import test from "ava";

import parseStatus, { IParsedStatus } from "./status_parser";

test("no commands", (t) => {
    const result = parseStatus("test test -t");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: false,
            slack: false,
            twitter: false,
            version: false,
            status: "test test -t",
        });
});

test("shorthand can be parsed", (t) => {
    const result = parseStatus("-ts test");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "test",
        });
});

test("multiple commands can be parsed", (t) => {
    const result = parseStatus("--twitter --share test status");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "test status",
        },
    );
});

test("unknown commands should be treated as a part of status", (t) => {
    const result = parseStatus("--twitter --share --unknown test status");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "--unknown test status",
        },
    );
});

test("unknown shorthand commands should be treated as a part of status", (t) => {
    const result = parseStatus("-ts -u test status 123");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "-u test status 123",
        },
    );
});

test("unknown combined shorthand commands should be ignored", (t) => {
    const result = parseStatus("-tsu test status 123");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "test status 123",
        },
    );
});

test("command-like string appeard in the middle of parameter should not treated as a command", (t) => {
    const result = parseStatus("-t test -s ssss");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: false,
            slack: false,
            twitter: true,
            version: false,
            status: "test -s ssss",
        },
    );
});

test("old :share command can be recognized", (t) => {
    const result = parseStatus(":share test status　ああああ");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: false,
            version: false,
            status: "test status　ああああ",
        },
    );
});

test("only the first colon command should be recognized", (t) => {
    const result = parseStatus(":share :option test status");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: false,
            version: false,
            status: ":option test status",
        },
    );
});

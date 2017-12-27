## What is this?
This is an easy way for anyone to host their own exploit for the PS4 on their LAN. This also blocks PSN to stop accidental update... this also serves the 4.05 update if you want it to.

## Why?
You won't be dependent on 3rd party websites
- They could be down
- They could be blocked
- They could be broken
- Etc, etc, etc.

## Requirements
- [Python 2](https://www.python.org/downloads/) (Tested on 2.7.14)
- The Python Directory added to your System Path Environment Variable (Windows)
- Root Privileges (Non-Windows)
- This should run on Windows, OSX, and Linux (Tested on Windows 7, Windows 10, and Ubuntu 16.04)

## How to download
- Download the zip on the [releases](https://github.com/Al-Azif/ps4-exploit-host/releases) page
- Download with Git, be sure to grab the submodules

    `git clone --recursive https://github.com/Al-Azif/ps4-exploit-host.git`

## How to run
1. Run `python start.py` from the command line
    - If it starts with no errors, note the IP given to you
2. On your PS4 use the noted IP as your DNS server
3. On your PS4, go to `Settings > User Guide` and select it. Boom, the exploit page should load.
4. When you're done use `Ctrl+C` to cleanly close the script

## How to use the updater
1. Put the system update in the `updates` folder as `PS4UPDATE_SYSTEM.PUP`
    - Optionally put the recovery update in the `updates` folder as `PS4UPDATE_RECOVERY.PUP`

        **SYS SHA-256:** 4B320246BB578C6C5A237184A79338C74F82A3AD2296412722FD775334368719

        **REC SHA-256:** B74CE16802CD7EC05158C1035E09A3131BC1D489DA2B4EF93B2C6029D9CA2BFA

2. MAKE SURE YOU ARE USING THIS SCRIPT AS YOUR DNS
3. Run a system update on your PS4 system. You should see a different page on the `View Details` option on your PS4

## Contributing
You can check the [issue tracker](https://github.com/Al-Azif/ps4-exploit-host/issues) for my to do list and/or bugs. Feel free to send a [pull request](https://github.com/Al-Azif/ps4-exploit-host/pulls) for whatever.
Be sure to report any bugs, include as much information as possible.

## What if a new exploit is released?
You should just be able to replace the exploit files in the `exploit` folder.

## Why do you commit so many little changes, tweaks, etc?
I have no self control... it also lets people see the actual development. From barely working chicken scratch to actual code.

## Credits
- crypt0s for [FakeDns](https://github.com/Crypt0s/FakeDns)
- Specter, qwertyoruiopz, Flatz, CTurt, Anonymous for the [exploit](https://github.com/Cryptogenic/PS4-4.05-Kernel-Exploit)

import subprocess
import sys
import os

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

scripts_dir = r"C:\Users\saiph\DiskWarren\scripts"
tests = [
    "audit_security.py",
    "verify_phase1.py",
    "verify_phase2.py",
    "verify_phase3.py",
    "benchmark_scanner.py",
    "verify_phase5.py",
    "verify_phase6.py",
    "verify_phase7.py",
    "verify_phase8.py",
    "verify_phase9.py",
    "verify_phase10.py",
    "verify_phase11.py",
    "verify_phase12.py",
    "verify_phase14.py",
    "verify_phase15.py",
    "verify_phase17.py"
]

print("=====================================================================")
print("          DISKWARREN MASTER QA REGRESSION & RELIABILITY SUITE        ")
print("=====================================================================\n")

passed_count = 0
failed_count = 0

for t in tests:
    script_path = os.path.join(scripts_dir, t)
    print(f"[*] Running {t}...", end=" ", flush=True)
    res = subprocess.run([sys.executable, script_path], capture_output=True, text=True, cwd=r"C:\Users\saiph\DiskWarren")
    if res.returncode == 0:
        print("[PASS]")
        passed_count += 1
    else:
        print("[FAIL]")
        print("--- STDERR ---")
        print(res.stderr)
        print("--- STDOUT ---")
        print(res.stdout)
        failed_count += 1

print("\n=====================================================================")
print(f"TOTAL VERIFICATIONS: {len(tests)}")
print(f"PASSED:              {passed_count}")
print(f"FAILED:              {failed_count}")
print("=====================================================================")

if failed_count > 0:
    print("[RESULT] QA REGRESSION FAILED")
    sys.exit(1)
else:
    print("[RESULT] ALL REGRESSION SUITES PASSED! G8 RELEASE GATE CLEARED!")

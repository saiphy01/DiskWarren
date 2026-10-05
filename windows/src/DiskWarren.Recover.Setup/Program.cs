using System;
using System.Drawing;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DiskWarren.Recover.Setup;

public class SetupForm : Form
{
    private readonly ProgressBar progressBar;
    private readonly Label statusLabel;
    private readonly Label titleLabel;

    public SetupForm()
    {
        Text = "DiskWarren Recover Setup";
        Size = new Size(480, 200);
        FormBorderStyle = FormBorderStyle.FixedDialog;
        MaximizeBox = false;
        MinimizeBox = false;
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.FromArgb(15, 23, 42); // Slate dark
        ForeColor = Color.White;

        try { Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath); } catch { }

        titleLabel = new Label
        {
            Text = "Installing DiskWarren Recover...",
            Font = new Font("Segoe UI", 12, FontStyle.Bold),
            ForeColor = Color.White,
            Location = new Point(24, 22),
            AutoSize = true
        };

        statusLabel = new Label
        {
            Text = "Preparing safe recovery environment...",
            Font = new Font("Segoe UI", 9),
            ForeColor = Color.FromArgb(148, 163, 184),
            Location = new Point(24, 56),
            Size = new Size(420, 20)
        };

        progressBar = new ProgressBar
        {
            Location = new Point(24, 88),
            Size = new Size(416, 22),
            Style = ProgressBarStyle.Continuous,
            Value = 10
        };

        Controls.Add(titleLabel);
        Controls.Add(statusLabel);
        Controls.Add(progressBar);

        Shown += SetupForm_Shown;
    }

    private async void SetupForm_Shown(object? sender, EventArgs e)
    {
        var progress = new Progress<InstallProgress>(p =>
        {
            progressBar.Value = Math.Clamp(p.Percent, 0, 100);
            statusLabel.Text = p.Status;
        });

        try
        {
            await InstallerLogic.InstallAsync(progress, launchAfterInstall: true);
            await Task.Delay(500);
            Application.Exit();
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Installation failed:\n{ex.Message}", "DiskWarren Recover Setup", MessageBoxButtons.OK, MessageBoxIcon.Error);
            Application.Exit();
        }
    }

    [STAThread]
    static void Main()
    {
        ApplicationConfiguration.Initialize();
        Application.Run(new SetupForm());
    }
}
